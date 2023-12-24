
const handlerDataPaginated = (data: Array<object>, totalData: number, initData: number, page: number, totalPages: number) => {
  return {
    data,
    totalData,
    paginated: {
      page: Number(page),
      itemRange: { min: initData, max: data.length > 0 ? initData + (data.length - 1) : 0 },
      totalPages,
    }
  }
}

export default handlerDataPaginated