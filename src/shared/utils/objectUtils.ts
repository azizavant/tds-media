export const filterEmptyValues = <T = Record<string, unknown>>(
  filter: T,
  extraOption?: { removeNull: boolean }
): Partial<T> => {
  const checkList: (null | string | undefined)[] = [undefined, '']

  if (extraOption?.removeNull) {
    checkList.push(null)
  }

  return Object.entries(filter as Record<string, unknown>)
    .filter(([, v]) => !checkList.includes(v as typeof checkList[number]))
    .reduce(
      (acc, [k, v]) => ({
        ...acc,
        [k]: v,
      }),
      {}
    )
}


export const removeDuplicateObjects = <T>(list: T[] | null | undefined, getKey: (item: T) => string) => {
  return [
    ...new Map(
      list?.map((item) => [getKey(item), item])
    ).values(),
  ]
}