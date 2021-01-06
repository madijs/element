const store = {
  profile: {
    id: 1,
    signedIn: true,
    permissions: [],
    login: "",
  },
  alerts: [
    {
      id: 1,
      message: "",
      type: "error",
      timeout: setTimeout(() => {}, 100),
    },
  ],
}
