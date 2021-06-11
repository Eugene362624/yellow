import axios from "axios";

const Getter = () =>
  axios.get(`https://jogtracker.herokuapp.com/api/v1/test/echo`).then((res) => res.data.timestamp);

const Poster = () =>
  axios.post(`https://jogtracker.herokuapp.com/api/v1/test/echo`).then((res) => res.data.timestamp);

const Putter = () =>
  axios.put(`https://jogtracker.herokuapp.com/api/v1/test/echo`).then((res) => res.data.timestamp);

const Deleter = () =>
  axios.delete(`https://jogtracker.herokuapp.com/api/v1/test/echo`).then((res) => res.data.timestamp);

export {Getter, Poster, Putter, Deleter};
