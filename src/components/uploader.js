import React from 'react';
import { Form, Upload, message, Button } from 'antd';
//import { UploadOutlined } from '@ant-design/icons'; crashed my app..
import UserContext from '../contexts/user';

class Uploader extends React.Component {

        //this.uploadProps = 0;
        state = {
            fileList: []
        };

    static contextType = UserContext; //define user context for class    

    /*
    componentDidMount() {

        //let files;
        let uploadProps ={
            name: 'upload',
            action: 'https://opera-ski-3000.codio-box.uk/api/images',
            headers: {
                "Authorization": "Bearer " + this.context.user.token 
            },
            onChange(info) {
                //this.setState({ 'fileList': info.fileList });
            
                if (info.file.status !== 'uploading') {
                    console.log(info);
                    //console.log(info.file, info.fileList);
                    //this.files = info.fileList;
                    //console.log(this.props);
                    //console.log(info);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    //console.log(`The SPA can now access the image via API path ${info.file.response.links.path}`);
                    //this.setState( { images: info.file } )
                    //files = info.fileList;
                    //console.log(info.fileList);
                    
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
            

        };
        this.uploadProps = uploadProps;
        //console.log(this.uploadProps);
    }
*/
    //addList = (info) => this.setState({ fileList: info.fileList });


    onChange = (info) => {
        this.setState({ fileList: info.fileList });
        if (info.file.status !== 'uploading') {
            //console.log(info);
            //console.log(info.file, info.fileList);
            //this.files = info.fileList;
            //console.log(this.props);
            //console.log(info);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            console.log(`The SPA can now access the image via API path ${info.file.response.links.path}`);
            //this.setState( { images: info.file } )
            //files = info.fileList;
            //console.log(info.fileList);
            
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    /*
    onChange(info) {
        addList(info);

        if (info.file.status !== 'uploading') {
            console.log(info);
            //console.log(info.file, info.fileList);
            //this.files = info.fileList;
            //console.log(this.props);
            //console.log(info);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            //console.log(`The SPA can now access the image via API path ${info.file.response.links.path}`);
            //this.setState( { images: info.file } )
            //files = info.fileList;
            //console.log(info.fileList);
            
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    */

    render() {
        let uploadProps ={
            name: 'upload',
            action: 'https://opera-ski-3000.codio-box.uk/api/images',
            headers: {
                "Authorization": "Bearer " + this.context.user.token 
            },
        };

        return (
            <>
            <Form.Item 
            name = "images"  
            label="Images: "
            >
                <Upload
                onChange = {this.onChange}
                {...uploadProps} >
                    <Button>Click to Upload</Button>
                </Upload> 
            </Form.Item>
            <Form.Item >
            <Button type="primary" htmlType="submit">
                Submit Application
            </Button>
            </Form.Item>
            </>
        );
    }
    

}

export default Uploader;