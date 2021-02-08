import React, { FC, Fragment, memo } from 'react';
import { Paper } from '@material-ui/core';
import { useFilePreviewStyles, usePaperStyles } from './filePreview.styles';

interface FilePreviewProps {
	text: string;
}

export const FilePreview: FC<FilePreviewProps> = memo(({ text }) => {
	const classes = useFilePreviewStyles();
	const paperClasses = usePaperStyles();

	return (
		<Fragment>
			<h3 className={classes.title}>Please Review This Case</h3>
			<Paper classes={paperClasses} elevation={3}>
				{text}
			</Paper>
		</Fragment>
	);
});
