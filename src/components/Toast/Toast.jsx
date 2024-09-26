import React, { useEffect, useState } from 'react'
import '../../styles/toast.css';

export default function Toast({ message, visible }) {

	const [show, setShow] = useState(visible);

    useEffect(() => {
        if (visible) {
            setShow(true);
            setTimeout(() => {
                setShow(false);
            }, 3000); // Hide toast after 2 seconds
        }
    }, [visible]);

  return (
	show && (
		<div className='toast'>
			{message}
		</div>
	)
  )
}
