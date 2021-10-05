import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import { getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import { useState } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import { db } from "../firebase";
import firebase from "firebase";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import DocumentRow from "../components/DocumentRow";

export default function Home() {
	const { data: session } = useSession();
	if (!session) return <Login />;

	const [showModal, setShowModal] = useState(false);
	const [modalInput, setModalInput] = useState("");
	const [snapshot] = useCollectionOnce(
		db
			.collection("userDocs")
			.doc(session.user.email)
			.collection("docs")
			.orderBy("timestamp", "desc")
	);

	const createDocument = () => {
		if (!modalInput) return;

		db.collection("userDocs").doc(session.user.email).collection("docs").add({
			fileName: modalInput,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setModalInput("");
		setShowModal(false);
	};

	const modal = (
		<Modal size='sm' active={showModal} toggler={() => setShowModal(false)}>
			<ModalBody>
				<input
					type='text'
					value={modalInput}
					placeholder='Enter name of document...'
					onChange={(e) => setModalInput(e.target.value)}
					onKeyDown={(e) => e.key === "Enter" && createDocument()}
					className='outline-none w-full'
				/>
			</ModalBody>

			<ModalFooter>
				<Button
					color='blue'
					buttonType='link'
					onClick={(e) => setShowModal(false)}
					ripple='dark'
				>
					Cancel
				</Button>

				<Button color='blue' onClick={createDocument} ripple='light'>
					Create
				</Button>
			</ModalFooter>
		</Modal>
	);

	return (
		<div>
			<Head>
				<title>G Docs</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />

			{modal}

			<div>
				<section className='bg-[#F8F9FA] pb-10 px-10'>
					<div className='max-w-3xl mx-auto'>
						<header className='flex items-center justify-between py-6'>
							<h2 className='text-gray-700 text-lg '>Start a new document</h2>
							<Button
								color='gray'
								buttonType='outline'
								iconOnly={true}
								ripple='dark'
								className='border-0'
							>
								<Icon name='more_vert' size='3xl' />
							</Button>
						</header>

						<div>
							<div
								onClick={() => setShowModal(true)}
								className='relative h-52 w-40 border-2 cursor-pointer hover:border-blue-500'
							>
								<Image src='https://links.papareact.com/pju' layout='fill' />
							</div>

							<p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>
								Blank
							</p>
						</div>
					</div>
				</section>

				<section className='bg-white px-10 lg:px-0'>
					<table className='w-full max-w-3xl mx-auto py-8 table-fixed text-sm text-gray-700'>
						<thead>
							<tr className='pb-5'>
								<th className='w-3/5 text-left'>My Documents</th>
								<th className='w-1/5'>Date Created</th>
								<th className='w-1/5'>
									<Icon name='folder' size='3xl' color='gray' />
								</th>
							</tr>
						</thead>

						<tbody>
							{snapshot?.docs.map((doc) => (
								<DocumentRow
									key={doc.id}
									id={doc.id}
									title={doc.data().fileName}
									date={doc.data().timestamp}
								/>
							))}
						</tbody>
					</table>
				</section>
			</div>
		</div>
	);
}

export async function getServerSideProps(context) {
	const session = await getSession(context);

	return {
		props: { session },
	};
}
