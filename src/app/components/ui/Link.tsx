import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import { cloneElement, isValidElement, Children } from 'react';

const ActiveLink: React.FC<LinkProps> = ({ children, ...props }) => {
    const { asPath } = useRouter();
    const child = Children.only(children);

    if (isValidElement(child)) {
        const { href, as } = props;
        const isActive = asPath === href || asPath === as;

        return (
            <Link {...props}>
                {cloneElement(child, { isActive })}
            </Link>
        );
    }

    return <Link {...props}>{child}</Link>;
};

export default ActiveLink;
