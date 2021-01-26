import React, { useState, useCallback, useEffect } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Icon, Button, Image } from '@quarkly/widgets';
import { FiX } from "react-icons/fi";
const overrides = {
	'button': {
		'kind': 'Button'
	},
	'overlay': {
		'kind': 'Box',
		'props': {
			'display': 'flex',
			'justify-content': 'center',
			'align-items': 'center',
			'position': 'fixed',
			'bottom': 0,
			'right': 0,
			'left': 0,
			'top': 0,
			'background': 'rgba(190, 191, 194, 0.8)',
			'transition': 'opacity 0.2s ease-out'
		}
	},
	'overlay-open': {
		'kind': 'Box',
		'props': {
			'z-index': 1,
			'opacity': 1,
			'visibility': 'visible'
		}
	},
	'overlay-close': {
		'kind': 'Box',
		'props': {
			'z-index': -1,
			'opacity': 0,
			'visibility': 'hidden'
		}
	},
	'content': {
		'kind': 'Box',
		'props': {
			'transition': 'opacity 0.2s ease-out',
			'max-width': '90%',
			'max-height': '90vh',
			'margin': '0 auto',
			'min-height': 0,
			'min-weight': 0
		}
	},
	'content-open': {
		'kind': 'Box',
		'props': {
			'z-index': 1,
			'opacity': 1,
			'visibility': 'visible'
		}
	},
	'content-close': {
		'kind': 'Box',
		'props': {
			'z-index': -1,
			'opacity': 0,
			'visibility': 'hidden'
		}
	},
	'close': {
		'kind': 'Icon',
		'props': {
			'category': 'fi',
			'icon': FiX,
			'size': '24px',
			'color': '#000',
			'position': 'absolute',
			'top': '15px',
			'right': '15px',
			'cursor': 'pointer'
		}
	}
};

const LightboxPopup = ({
	showPopupProp,
	imgLinkProp,
	...props
}) => {
	const [isOpen, setOpen] = useState(showPopupProp);
	useEffect(() => {
		setOpen(showPopupProp);
	}, [showPopupProp]); // useEffect(() => {
	//     setOpen(imgLinkProp);  
	// }, [imgLinkProp]); 

	const clickButton = () => {
		setOpen(!isOpen);
	};

	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, {});
	return <Box {...rest}>
		<Box display='inline-block' cursor='pointer' onClick={clickButton}>
			{children}
			 
		</Box>
		<Box onClick={clickButton} {...override('overlay', `overlay-${isOpen ? 'open' : 'close'}`)}>
			<Box>
				<Icon onClick={clickButton} {...override('close')} />
				<Box {...override('content', `overlay-${isOpen ? 'open' : 'close'}`)}>
					<Image src={imgLinkProp} max-width="100%" max-height="inherit" margin="0"></Image>
					 
				</Box>
			</Box>
		</Box>
	</Box>;
};

const propInfo = {
	showPopupProp: {
		title: 'Показать Popup',
		description: {
			ru: 'Показать popup'
		},
		control: 'checkbox',
		category: 'Main',
		weight: 1
	},
	imgLinkProp: {
		title: 'Ссылка на картинку',
		description: {
			ru: 'Ссылка на качественную картинку'
		},
		control: 'input',
		category: 'Main',
		weight: 1
	}
};
const defaultProps = {
	showPopupProp: false
};
Object.assign(LightboxPopup, {
	overrides,
	propInfo,
	defaultProps
});
export default LightboxPopup;