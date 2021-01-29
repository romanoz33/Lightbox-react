import React, { useState, useEffect, useCallback } from 'react';
import { useOverrides } from '@quarkly/components';
import { Box, Icon, Image } from '@quarkly/widgets';
import scroll from './Scrollblock';
import { IoMdClose } from "react-icons/io";
const overrides = {
	'Wrapper user element': {
		'kind': 'Box',
		'props': {
			'display': 'inline-block',
			'cursor': 'pointer'
		}
	},
	'Overlay': {
		'kind': 'Box',
		'props': {
			'display': 'flex',
			'background': 'rgba(0, 0, 0, .7)',
			'justify-content': 'center',
			'align-items': 'center',
			'position': 'fixed',
			'bottom': 0,
			'right': 0,
			'left': 0,
			'top': 0
		}
	},
	'Overlay:open': {
		'kind': 'Box',
		'props': {
			'z-index': 123,
			'opacity': 1,
			'visibility': 'visible',
			'transition': 'all .7s ease-out;'
		}
	},
	'Overlay:close': {
		'kind': 'Box',
		'props': {
			'z-index': -1,
			'opacity': 0,
			'visibility': 'hidden',
			'transition': 'all .7s ease-out;'
		}
	},
	'Lihgt image': {
		'kind': 'Image',
		'props': {
			'margin': '0 auto',
			'min-height': 0,
			'min-weight': 0,
			'src': 'http://placehold.it/800'
		}
	},
	'Lihgt image:open': {
		'kind': 'Image',
		'props': {
			'z-index': 123,
			'opacity': 1,
			'visibility': 'visible',
			'transform': 'scale(1)',
			'transition': 'all .5s ease-out'
		}
	},
	'Lihgt image:close': {
		'kind': 'Image',
		'props': {
			'z-index': -1,
			'opacity': 0,
			'visibility': 'hidden',
			'transform': 'scale(.9)',
			'transition': 'all .5s ease-out'
		}
	},
	'Icon close': {
		'kind': 'Icon',
		'props': {
			'category': 'io',
			'icon': IoMdClose,
			'size': '30px',
			'color': '#fff',
			'position': 'absolute',
			'top': '15px',
			'right': '20px',
			'cursor': 'pointer',
			'z-index': '124'
		}
	}
};
const zoomInStyles = {
	'max-width': '100%',
	'max-height': '100vh',
	'cursor': 'zoom-out'
};
const zoomOutStyles = {
	'max-width': '90%',
	'max-height': '90vh',
	'cursor': 'zoom-in'
};

const Lightbox = ({
	showImageProp,
	offScrollProp,
	...props
}) => {
	const [isOpen, setOpen] = useState(showImageProp);
	const [isBigSize, setBigSize] = useState(false);
	const [isDoubleClick, setDoubleClick] = useState(false);
	useEffect(() => {
		setOpen(showImageProp); // В случае, когда отключаем Lighbox с помощью пропса, убираем блокировку скрола

		showImageProp ? '' : !offScrollProp ? scroll.enable() : '';
	}, [showImageProp]);

	const openLight = () => {
		setOpen(true);
		!offScrollProp ? scroll.disable() : '';
	};

	const closeLight = () => {
		setOpen(false);
		!offScrollProp ? scroll.enable() : ''; // setZoom(false);
	};

	const stopEventClick = e => {
		e.stopPropagation();
		e.cancelBubble = true; // для IE
	};

	const zoomImage = e => {
		const naturalSize = {
			width: e.target.naturalWidth,
			height: e.target.naturalHeight
		};
		const elementSize = {
			width: e.target.getBoundingClientRect().width,
			height: e.target.getBoundingClientRect().height
		};
		console.log('naturalSize.width' + naturalSize.width);
		console.log('elementSize.width' + elementSize.width);

		if (naturalSize.width > elementSize.width) {
			setBigSize(true);
			setDoubleClick(!isDoubleClick);
		} else {
			setBigSize(true);
		}
	};

	const {
		override,
		children,
		rest
	} = useOverrides(props, overrides, {});
	return <Box {...rest}>
		<Box {...override('Wrapper user element')} onClick={openLight}>
			{children}
			 
		</Box>
		  
		<Box onClick={closeLight} {...override('Overlay', `Overlay${isOpen ? ':open' : ':close'}`)}>
			<Icon onClick={closeLight} {...override('Icon close')} />
			  
			<Image onClick={e => stopEventClick(e)} onDoubleClick={e => zoomImage(e)} {...override('Lihgt image', `Lihgt image${isOpen ? ':open' : ':close'}`)} {...isDoubleClick && isBigSize ? zoomInStyles : zoomOutStyles} />
			 
		</Box>
		 
	</Box>;
};

const propInfo = {
	showImageProp: {
		title: 'Показать изображение',
		description: {
			ru: 'Показать полное изображение'
		},
		control: 'checkbox',
		category: 'Main',
		weight: 1
	},
	offScrollProp: {
		title: 'Отключить скролл',
		description: {
			ru: 'Отключить скролл при показе полного изображения'
		},
		control: 'checkbox',
		category: 'Main',
		weight: 1
	}
};
const defaultProps = {
	showImageProp: false,
	offScrollProp: false
};
Object.assign(Lightbox, {
	overrides,
	propInfo,
	defaultProps
});
export default Lightbox;