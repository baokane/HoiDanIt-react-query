import { useMutation, useQueryClient } from '@tanstack/react-query';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

interface IDeleteUser {
    id: number;
}

const BlogDeleteModal = (props: any) => {
    const { dataBlog, isOpenDeleteModal, setIsOpenDeleteModal } = props;

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (payload: IDeleteUser) => {
            const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
                method: "DELETE",
                body: JSON.stringify({
                    id: payload.id
                }),
                headers: {
                    "Content-Type": " application/json"
                }
            });
            return res.json()
        },
        onSuccess: (data, variables, context) => {
            // Boom baby!
            toast('🦄 Wow so easy!')
            setIsOpenDeleteModal(false)
            queryClient.invalidateQueries({ queryKey: ['fetchBlogs'] })
        },
    })

    const handleSubmit = () => {
        mutation.mutate({ id: dataBlog?.id })
        console.log({ id: dataBlog?.id });
    }

    return (
        <Modal
            show={isOpenDeleteModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            backdrop={false}
            onHide={() => setIsOpenDeleteModal(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Delete A Blog
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Delete the blog: {dataBlog?.title ?? ""}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant='warning'
                    onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                <Button onClick={() => handleSubmit()}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default BlogDeleteModal;