import  { useState } from 'react'
import CustomModal from '../common/CustomModal'
import CustomButton from '../common/CustomButton';

const Demo = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalTitle, setModalTitle] = useState("")
    return (
        <div>Demo
            <CustomButton
                title=" Demo"
                className="bg-[#3c8dbc] text-white hover:bg-blue-600 px-4 py-5 rounded-md mb"
                onClick={() => {
                    setModalTitle("Add Client");
                    setIsModalOpen(true);
                }}
            />
            <CustomModal open={isModalOpen}
                title={modalTitle}
                onClose={() => {
                    setIsModalOpen(false);
                }} >

                    <h3>Welcome</h3>
                </CustomModal>
        </div>
    )
}

export default Demo