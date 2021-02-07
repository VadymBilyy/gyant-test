import React, { FC, memo } from 'react';
import { useFilePreviewStyles, usePaperStyles } from './filePreview.styles';
import { Paper } from '@material-ui/core';

interface FilePreviewProps {
	text: string;
}

export const FilePreview: FC<FilePreviewProps> = memo(({ text }) => {
	const classes = useFilePreviewStyles();
	const paperClasses = usePaperStyles();

	return (
		<div className={classes.container}>
			<h3 className={classes.title}>Please Review This Case</h3>
			<Paper classes={paperClasses} elevation={3}>
				{text}
			</Paper>
		</div>
	);
});
