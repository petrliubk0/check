import React from 'react';
import cn from 'classnames';

class LoaderSecond extends React.Component {
    render() {
        const { width, height, className } = this.props,
        styles = {
            width: String(width || 200) + 'px',
            height: String(height || 200) + 'px'
        };
        return (
            <div style={styles} className={cn('loader-second', className)}>

            </div>
        )
    }
}

export default LoaderSecond;