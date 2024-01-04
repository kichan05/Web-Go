export const LogList = ({log}) => {
  return (
    <ul>
      {log.map((i, index) => (
        <li>{index}. {i}</li>
      ))}
    </ul>
  )
}