import axios from "axios";

const Getter = () =>
  axios.get(`https://jogtracker.herokuapp.com/api/v1/test/echo`).then((res) => res.data.timestamp);

const Poster = () =>
  axios.post(`https://jogtracker.herokuapp.com/api/v1/test/echo`).then((res) => res.data.timestamp);

const Putter = () =>
  axios.post(`https://jogtracker.herokuapp.com/api/v1/test/echo`).then((res) => res.data.timestamp);

const Delitter = () =>
  axios.post(`https://jogtracker.herokuapp.com/api/v1/test/echo`).then((res) => res.data.timestamp);

export {Getter, Poster, Putter, Delitter};