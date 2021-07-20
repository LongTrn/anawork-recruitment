import React from 'react';
import Button from '@material-ui/core/Button';
import { useSnackbar, } from 'notistack';
import Collapse from '@material-ui/core/Collapse';

export default function ToastMessage ({ message, normal = true }) {
	const { enqueueSnackbar } = useSnackbar();
	const options = {
		anchorOrigin: {
			vertical: 'bottom',
			horizontal: 'right',
		},
		dense: false,
		preventDuplicate: true,
		// action: "",
		iconVariant: {
			success: '✅',
			error: '✖️',
			warning: '⚠️',
			info: 'ℹ️',
		},
		TransitionComponent: Collapse,

	}

	const handleClick = () => {
		enqueueSnackbar( message || 'I love snacks.', options );
	};

	const handleClickVariant = (variant) => () => {
		// variant could be success, error, warning, info, or default
		enqueueSnackbar('This is a success message!', { ...options, variant });
	};

	return (
		<React.Fragment>
			{normal? 
				(<button onClick={handleClick}>Show snackbar</button>)
				:
				(<button className="btn" onClick={handleClickVariant('success')}>Show success snackbar</button>)
			}
		</React.Fragment>
	);
}