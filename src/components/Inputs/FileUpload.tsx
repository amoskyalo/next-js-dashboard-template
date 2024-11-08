import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@mui/styles';
import { snackbarToast } from '../Snackbar';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Image from 'next/image';

type PropsInterface = {
    setFileUrl: any;
    previewFile?: any;
    title: string;
};
const useStyles = makeStyles({
    thumbsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    thumb: {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginRight: 8,
        boxSizing: 'border-box',
        height: '100%',
        width: '100%',
        padding: 10,
    },
    thumbInner: {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden',
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    img: {
        display: 'block',
        width: 'auto',
        height: '100%',
    },

    root: (props: any) => ({
        ...{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            borderWidth: 2,
            borderRadius: 2,
            borderColor: '#eeeeee',
            borderStyle: 'dashed',
            backgroundColor: '#fafafa',
            color: '#bdbdbd',
            outline: 'none',
            transition: 'border .64s ease-in-out',
            height: 100,
            justifyContent: 'center',
        },
        ...(props.isDragActive ? { borderColor: '#2164f3' } : {}),
        ...(props.isDragAccept ? { borderColor: '#00e676' } : {}),
        ...(props.isDragReject ? { borderColor: '#ff1744' } : {}),
    }),
});

export const FileUpload = ({ setFileUrl, previewFile, title }: PropsInterface) => {
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
        },
        minSize: 1,
        maxSize: 10 * 1024 * 1024,
        onDrop: (acceptedFiles, fileRejections) => {
            const error = fileRejections[0]?.errors?.[0];
            const acceptFiles = acceptedFiles[0];

            if (fileRejections.length > 0) {
                if (error?.code === 'file-too-large') {
                    snackbarToast.error('Size error');
                } else if (error?.code === 'file-invalid-type') {
                    snackbarToast.error('Invalid type error');
                } else {
                    snackbarToast.error(error.message);
                }
            } else {
                const fileURL = URL.createObjectURL(acceptFiles);
                setFileUrl(fileURL);
            }
        },
    });
    const props = { isDragActive, isDragAccept, isDragReject };
    const classes = useStyles(props);

    return (
        <div {...getRootProps({})} className="flex items-center w-32">
            <div className="relative w-32 h-24 object-cover z-0 bg-grey1 border border-dashed border-gray-400 rounded-md flex items-center justify-center gap-x-2 cursor-pointer">
                <input {...getInputProps()} />
                {previewFile ? (
                    <div className={classes.thumb} style={{ border: 'none', margin: 0 }}>
                        <Image
                            alt=""
                            src={previewFile || '/icons/upload-image.svg'}
                            className="w-full h-full z-0 rounded-md"
                            height={144}
                            width={144}
                        />
                    </div>
                ) : (
                    <div className={` ${classes.thumbInner} flex-col gap-2 p-2`}>
                        <CloudUploadIcon />
                        <h1 className="w-full text-sm text-center text-blue-600">{title}</h1>
                    </div>
                )}
            </div>
        </div>
    );
};
