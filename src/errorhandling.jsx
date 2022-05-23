const ErrorComponent = (err) => {
  console.log("ERRORHANLDING", err);
  return (
    <p className="App-error-red">
      {err.response
        ? "Data error : " + err.response.data.msg
        : "Network error :  Data not available"}
    </p>
  );
};

export default ErrorComponent;
