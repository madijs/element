import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import SparkMD5 from "spark-md5"
import $ from "jquery"
import { fileupload } from "blueimp-file-upload"
import { Modal, Card, Table, Input, Button } from "semantic-ui-react"
import LessonEnd from "../components/LessonEnd"

const TestingPage = () => {
  const chunkedUploadRef = useRef()
  const progressRef = useRef()
  const messagesRef = useRef()
  useEffect(() => {
    let md5 = ""
    let formData = []
    const calculateMd5 = (file, chunkSize) => {
      let slice =
          File.prototype.slice ||
          File.prototype.mozSlise ||
          File.prototype.webkitSlice,
        chunks = Math.ceil(file.size / chunkSize),
        currentChunk = 0,
        spark = new SparkMD5.ArrayBuffer()
      const onload = (e) => {
        console.log(e.target.result)
        spark.append(e.target.result)
        currentChunk += 1
        if (currentChunk < chunks) {
          readNextChunk()
        } else {
          md5 = spark.end()
        }
      }
      const readNextChunk = () => {
        const reader = new FileReader()
        reader.onload = onload
        let start = currentChunk * chunkSize,
          end = Math.min(start + chunkSize, file.size)
        reader.readAsArrayBuffer(slice.call(file, start, end))
      }
      readNextChunk()
    }
    console.log($(chunkedUploadRef.current))
    console.log($(messagesRef.current))
    console.log($(progressRef))
    console.log()
    $("#chunked_upload").fileupload({
      headers: {},
      url:
        "https://api.element.elementschool.kz/api/lessons/a0c52b3f-bba3-46e2-be72-8d1861023890/chunked_upload/",
      maxChunkSize: 100000,
      dataType: "json",
      formData: formData,
      add: (e, data) => {
        $("#messages").empty()
        console.log(data)
        console.log(data.files[0])
        formData.splice(1)
        calculateMd5(data.files[0], 100000)
        data.submit()
        console.log(data.submit)
      },
      chunkdone: (e, data) => {
        // Called after uploading each chunk
        console.log(e)
        console.log(e.target)
        console.log(data.loaded)
        if (formData.length < 2) {
          formData.push({ name: "upload_id", value: data.result.upload_id })
        }
        $("#messages").append($("<p>").text(JSON.stringify(data.result)))
        let progress = parseInt((data.loaded / data.total) * 100.0, 10)
        $("#progress").text(Array(progress).join("=") + "> " + progress + "%")
      },
      done: (e, data) => {
        // Called when the file has completely uploaded
        $.ajax({
          type: "POST",
          url:
            "https://api.element.elementschool.kz/api/lessons/a0c52b3f-bba3-46e2-be72-8d1861023890/chunked_upload_complete/",
          data: {
            upload_id: data.result.upload_id,
            md5: md5,
          },
          headers: {},
          dataType: "json",
          success: (data) => {
            $("#messages").append($("<p>").text(JSON.stringify(data)))
          },
        })
      },
    })
    return () => {}
  }, [])
  return (
    <>
      <div>
        <input
          id="chunked_upload"
          type="file"
          name="the_file"
          // ref={chunkedUploadRef}
        />
        <p
          id="progress"
          //ref={progressRef}
        ></p>
        <div
          id="messages"
          //ref={messagesRef}
        ></div>
      </div>
    </>
  )
}

export default TestingPage
