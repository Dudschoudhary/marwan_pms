import { Button } from "antd"

interface CustomButtonProps {
    title: string; 
    className: any 
    onClick:any
  }
const CustomButton: React.FC<CustomButtonProps> = ({ title, className, onClick}) => {
  return (
    <>
        <Button className={className} onClick={onClick}>{title}</Button>
    </>
  )
}

export default CustomButton