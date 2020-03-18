function fetch(params: {name: string}) {
  return new Promise(res => {
    res({
      id: "asd",
      name: params.name
    });
  });
}
