export default function log(msg, ...values) {
  function now() {
    let date = new Date();
    return (
      date.getFullYear() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      ":" +
      date.getMilliseconds()
    );
  }

  console.log("[%s] " + msg, now(), ...values);
}
