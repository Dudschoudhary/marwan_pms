import { Table } from "antd"
interface CustomTableProps{
    columns:any,
    data:any,
    className:string
}
const CustomTable:React.FC<CustomTableProps> = ({columns,data, className}) => {
  return (
    <>
    <Table  columns={columns} dataSource={data} className={className} />
    </>
  )
}

export default CustomTable