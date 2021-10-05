import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import { useRouter } from "next/dist/client/router";

function DocumentRow({ id, title, date }) {
	const router = useRouter();

	return (
		<tr
			onClick={() => router.push(`/doc/${id}`)}
			className='rounded-lg hover:bg-gray-100 text-gray-700 cursor-pointer'
		>
			<td className='flex items-center'>
				<Icon name='article' size='3xl' color='blue' />
				<p className='truncate'>{title}</p>
			</td>
			<td>
				<p className='text-sm'>{date?.toDate().toLocaleDateString()}</p>
			</td>
			<td>
				<Button
					color='gray'
					buttonType='outline'
					rounded={true}
					iconOnly={true}
					ripple='dark'
					className='border-0'
				>
					<Icon name='more_vert' size='3xl' />
				</Button>
			</td>
		</tr>
	);
}

export default DocumentRow;
