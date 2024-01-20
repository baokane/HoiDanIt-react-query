import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

interface IDeleteUser {
    id: number;
}

const BlogDeleteModal = (props: any) => {
    const { dataUser, isOpenDeleteModal, setIsOpenDeleteModal } = props;

    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (payload: IDeleteUser) => {
            const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": " application/json"
                }
            });
            return res.json()
        },
        onSuccess: (data, variables, context) => {
            // Boom baby!
            toast('🦄 Wow so easy!')
            // setEmail('')
            // setName('')
            setIsOpenDeleteModal(false)
            queryClient.invalidateQueries({ queryKey: ['fetchUser'] })
        },
    })

    const handleSubmit = () => {
        mutation.mutate({ id: dataUser?.id })
        console.log({ id: dataUser?.id });
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
                Delete the user: {dataUser?.email ?? ""}
            </Modal.Body>
            <Modal.Footer>
                {!mutation.isPending ?
                    <>
                        <Button
                            variant='warning'
                            onClick={() => setIsOpenDeleteModal(false)} className='mr-2'>Cancel</Button>
                        <Button onClick={() => handleSubmit()}>Save</Button>
                    </>
                    :
                    <Button variant="primary" disabled>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        <></> Saving...
                    </Button>
                }
            </Modal.Footer>
        </Modal>
    )
}

export default BlogDeleteModal;