import {memo, useState} from 'react';
import Calendar from './components/Calendar';
import HeadlessTippy from '@tippyjs/react/headless';
import {PropsDatePicker} from './interface';
import clsx from 'clsx';
import styles from './DatePicker.module.scss';
import convertDate from '~/common/funcs/convertDate';
import {FaRegCalendarCheck} from 'react-icons/fa';

function DatePicker({
	placeholder,
	label,
	onSetValue,
	onClean,
	value,
	icon,
	className,
	blockOldDay,
	futureDayblock,
	readonly,
}: PropsDatePicker) {
	const [show, setShow] = useState<boolean>(false);
	const [isFocus, setIsFocus] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>(value ? convertDate(value).getDateFormat() || '' : '');

	const handleClickDay = (time: number) => {
		setIsFocus(false);
		setShow(false);
		const date = new Date(time);
		onSetValue(date);
		setInputValue(convertDate(date).getDateFormat() || '');
	};

	// const handleClean = (e: any) => {
	// 	e.stopPropagation();
	// 	onSetValue(null);
	// 	setInputValue('');
	// };

	const formatDateInput = (value: string) => {
		const cleanValue = value.replace(/\D/g, '');

		let day = cleanValue.slice(0, 2);
		let month = cleanValue.slice(2, 4);
		const year = cleanValue.slice(4, 8);

		if (day.length === 2 && Number(day) > 31) {
			day = '0' + day[0];
			month = day[1] + month;
		}

		if (month.length === 2 && Number(month) > 12) {
			month = '0' + month[0];
		}

		let formattedValue = day;
		if (month) formattedValue += '/' + month;
		if (year) formattedValue += '/' + year;

		return formattedValue;
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		const formattedInput = formatDateInput(input);
		setInputValue(formattedInput);

		const regex = /^(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}$/;
		if (regex.test(formattedInput)) {
			const [day, month, year] = formattedInput.split('/').map(Number);
			const date = new Date(year, month - 1, day);

			if (!isNaN(date.getTime())) {
				onSetValue(date);
			}
		}
	};

	const handlerBlur = () => {
		setIsFocus(false);
	};

	return (
		<div className={styles.container}>
			{label && <p className={styles.label}>{label}</p>}

			<div
				className={clsx(styles.calendar, className, {
					[styles.placeholder]: !value,
					[styles.focus]: isFocus || show,
					[styles.readonly]: readonly,
				})}
			>
				<input
					type='text'
					onBlur={handlerBlur}
					value={inputValue}
					onChange={handleInputChange}
					placeholder={placeholder}
					readOnly={readonly}
					className={clsx(styles.input)}
					maxLength={10}
					onClick={() => {
						if (!readonly) {
							setIsFocus(true);
						}
					}}
				/>
				<HeadlessTippy
					interactive
					visible={show}
					placement='bottom'
					render={(attrs) => (
						<Calendar onClickDay={handleClickDay} show={show} blockOldDay={blockOldDay} futureDayblock={futureDayblock} />
					)}
					onClickOutside={() => setShow(false)}
				>
					<div>
						<div
							onClick={() => {
								if (!readonly) {
									setShow(!show);
								}
							}}
						>
							{icon && (
								<div className={styles.icon}>
									<FaRegCalendarCheck size={18} />
								</div>
							)}

							{/* {onClean && !!value && (
								<div className={clsx(styles.clean, styles.icon)} onClick={handleClean}>
									<RiCloseCircleFill color='#29303c' />
								</div>
							)} */}
						</div>
					</div>
				</HeadlessTippy>
			</div>
		</div>
	);
}

export default memo(DatePicker);
