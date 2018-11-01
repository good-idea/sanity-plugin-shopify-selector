// @flow
import * as React from 'react'
import styled, { css } from 'styled-components'
import type { Product, Collection } from '../types'
import { Button } from './Generic'
import { baseCardStyles } from './styles'

const CardWrapper = styled.div`
	${baseCardStyles};
	width: 100%;
`

const CardFigure = styled.figure`
	width: 40px;
	height: 40px;
	background-color: lightGray;
	margin: 0 10px 0 0;
`

const CardImg = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`

const CardImage = ({ src }: { src?: string }) => (
	<CardFigure>{src ? <CardImg src={src} /> : null}</CardFigure>
)

CardImage.defaultProps = {
	src: undefined,
}

const noWrap = css`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

const TextWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: left;
`

const Title = styled.p`
	${noWrap};
	margin: 0;
`

const Subtitle = styled.h5`
	font-weight: normal;
	color: gray;
	margin: 0;
	${noWrap};
`

type Props = {
	item: Product | Collection,
}

const CardInner = ({ item }: Props) => {
	const { title, itemType, image, images } = item
	const sourceImage =
		itemType.toLowerCase() === 'collection'
			? image
			: images && images.length
				? images[0]
				: undefined
	const src = sourceImage ? sourceImage.transformedSrc : undefined
	const subtitle = itemType
	return (
		<React.Fragment>
			<CardImage src={src} />
			<TextWrapper>
				<Title>{title}</Title>
				{subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
			</TextWrapper>
		</React.Fragment>
	)
}

const Card = (props: Props) => (
	<CardWrapper>
		<CardInner {...props} />
	</CardWrapper>
)

export default Card

/**
 * CardButton
 */

type CardButtonProps = {
	onClick: () => void,
	item: Props,
}

export const CardButton = ({ onClick, item }: CardButtonProps) => (
	<Button onClick={onClick}>
		<CardInner item={item} />
	</Button>
)
