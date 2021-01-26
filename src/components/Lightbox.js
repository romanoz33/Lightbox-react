import React, { useState, useCallback, useEffect } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Icon, Button } from '@quarkly/widgets';
import { FiX } from "react-icons/fi";
const duration = '.15s';
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
			'max-width': '80%',
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
			'top': '10px',
			'right': '10px'
		}
	}
};

const LightboxPopup = ({
	showPopupProp,
	...props
}) => {
	const [isOpen, setOpen] = useState(showPopupProp); // При изменении проспса цвета задаем новый цвет

	useEffect(() => {
		setOpen(showPopupProp);
	}, [showPopupProp]); // console.log(showPopupProp)

	const clickButton = () => {
		setOpen(!isOpen);
	};

	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, {});
	return <Box {...rest}>
		<Button border="1px solid red" background-color="red" onClick={clickButton}>
			click
		</Button>
		 
		<Box onClick={clickButton} {...override('overlay', `overlay-${isOpen ? 'open' : 'close'}`)}>
			<Box>
				<Icon onClick={clickButton} {...override('close')} />
				<Box {...override('content', `overlay-${isOpen ? 'open' : 'close'}`)}>
					{children}
					 
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
		category: 'Popup',
		weight: 1
	}
};
const defaultProps = {
	showPopupProp: true
};
Object.assign(LightboxPopup, {
	overrides,
	propInfo,
	defaultProps
});
export default LightboxPopup;