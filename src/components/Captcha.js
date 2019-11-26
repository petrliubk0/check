import React, { PureComponent } from 'react';
import cn from 'classnames';

import { getCaptcha } from "../utils/request.api";

class Captcha extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            captchaImg: '',
            captchaKey: ''
        };

        this.refresh = this.refresh.bind(this);
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        const { onRefresh, onLoading } = this.props;
        onLoading();
        this.setState({loading: true});
        getCaptcha()
            .then(result => {
                this.setState({
                    loading: false,
                    captchaImg: result.data.data,
                    captchaKey: result.data.key
                });
                onRefresh(result.data.key);
            });
    }


    render() {
        const {captchaImg, loading} = this.state,
            className = `captcha form-control ${this.props.className ? this.props.className: ""}`;
        return (
            <div className={className}>
                <div className={"captchaImage"}>
                    {<div dangerouslySetInnerHTML={{__html: captchaImg}}></div>}
                </div>
                <div className={cn("refresh-btn", {loading})} onClick={this.refresh}>
                </div>
            </div>
        );
    }
}


export default Captcha;

