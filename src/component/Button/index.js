import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({ to, href, primary, outline, children, onClick }) {
    let Component = 'button';
    const props = {
        onClick,
    };

    if (to) {
        props.to = to;
        Component = Link;
    } else if (href) {
        props.href = href;
        Component = 'a';
    }

    const classes = cx('wrapper', {
        primary,
        outline,
    });

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
}

export default Button;
