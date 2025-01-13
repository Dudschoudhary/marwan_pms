import { Modal } from "antd";
// import { TProps } from "./CustomForm";


interface TProps {
  open:boolean,
  title: string,
  onClose:any,
  children:any
}


const CustomModal = ({
  open,
  title,
  onClose,
  children,
}: TProps) => {
  return (
    <Modal
      open={open}
      title={
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      }
      onCancel={onClose}
      footer={null}
      className="rounded-lg shadow-lg"
    >
      <div className="space-y-4">
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;
