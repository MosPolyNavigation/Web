// noinspection TypeScriptCheckImport
import React, {FC, useEffect, useRef} from 'react';
import cl from './SearchButton.module.scss';
import Icon from '../../common/Icon/Icon.tsx';
import {IconLink} from '../../../associations/IconLink.ts';
import {Color} from '../../../associations/enums.ts';
import classNames from 'classnames';

interface SearchButtonProps {
	onClick: () => void,
	classNameExt?: string,
	expanded: boolean
}

const SearchButton: FC<SearchButtonProps> = ({onClick, classNameExt, expanded}) => {
	return (
		<div className={classNames(cl.searchButtonWrapper, {[cl.expanded]: expanded})}>
			<div className={cl.filler}></div>

			<button onClick={!expanded ? onClick : null} className={classNames(cl.searchButton, classNameExt)}>
				<div className={cl.secondStroke}>
					<div className={classNames(cl.filler, cl.fillerInner)}></div>

					<Icon classNameExt={cl.searchIcon} iconLink={IconLink.SEARCH} color={!expanded ? Color.C3 : Color.C4} />
					<div className={cl.searchText}>Поиск...</div>

					<SearchInput expanded={expanded} />
				</div>
			</button>

		</div>
	);
};

interface SearchInputProps {
	expanded: boolean;
}

const SearchInput = ({expanded}: SearchInputProps) => {

	useEffect(() => {
		if(expanded) {
			setTimeout(() => {
				inputRef.current.focus();
			}, 175);
		}
	}, [expanded]);

	const inputRef = useRef(null);

	return <>
		<label htmlFor="search"></label>
		<input
			ref={inputRef}
			placeholder={'Поиск...'}
			type="text"
			name="search"
			id="search"
		/>
	</>;
};

export default SearchButton;
