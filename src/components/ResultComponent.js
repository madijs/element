import React, { useState, useEffect } from "react"
import { Doughnut } from "react-chartjs-2"
import { Modal, Button, Card } from "semantic-ui-react"

const options = {
  legend: {
    display: false,
  },
  tooltips: {
    enabled: false,
  },
  cutoutPercentage: 85,
  rotation: -0.5 * Math.PI,
  circumference: 2 * Math.PI,
  animation: {
    animateRotate: true,
    animateScale: false,
  },
}

const ResultComponent = (props) => {
  const { modal, correct, all, setModal, resType } = props
  return (
    <>
      <div>
        <Modal
          open={modal}
          style={{
            marginTop: "-40vh",
            width: 550,
            height: 345,
            borderRadius: 16,
          }}
          onClose={() => {
            setModal(false)
          }}
        >
          <Card fluid style={{ height: "100%" }}>
            <Card.Content>
              <div style={{ margin: 20 }}>
                <div
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: "#2c3854",
                    lineHeight: "29,36px",
                  }}
                >
                  Результат {resType === 1 ? "теста" : ""}{" "}
                  {resType === 2 ? "открытых вопросов" : ""}
                  {resType === 3 ? "эссе" : ""}
                </div>
                <div style={{ display: "flex", marginTop: 40 }}>
                  <div style={{ width: 230, height: 230, marginLeft: -40 }}>
                    <Doughnut
                      data={{
                        datasets: [
                          {
                            data: [correct, all - correct],
                            backgroundColor: ["#00aaf4", "#c4c4c4"],
                          },
                        ],
                        labels: [
                          { id: 0, type: "Blue" },
                          { id: 1, type: "Gray" },
                        ],
                      }}
                      options={options}
                      redraw={true}
                    />
                    <div
                      style={{
                        fontWeight: 600,
                        fontSize: 24,
                        lineHeight: "19,5px",
                        color: "#00aaf4",
                        position: "relative",
                        top: -70,
                        left: 90,
                        zIndex: 100,
                      }}
                    >
                      {parseInt(100 * (correct / all)) + "%"}
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        marginTop: 8,
                        color: "#c2cfe0",
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: "19,5px",
                      }}
                    >
                      {correct} правильных ответов
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        color: "#c2cfe0",
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: "19,5px",
                      }}
                    >
                      {all - correct} неправильных ответов
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        color: "#005cff",
                        fontSize: 16,
                        fontWeight: 600,
                        lineHeight: "19,5px",
                      }}
                    >
                      + {correct * 3} / {all * 3} терабаксов
                    </div>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </Modal>
      </div>
    </>
  )
}

export default ResultComponent
