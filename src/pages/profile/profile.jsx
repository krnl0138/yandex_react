import styles from './profile.module.css';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAuth } from '../../services/auth';

export default function Profile() {
    const history = useHistory();
    let auth = useAuth();
    let location = useLocation();
    console.log(location.state);

    const user = auth.user.user;
    const [form, setForm] = useState({ username: user.name, email: user.email, password: '' });

    const resetProfileFormValue = () => {
        setForm(prev => ({ ...prev, username: user.name, email: user.email, password: '' }));
    }

    useEffect(() => {
        auth.getUserData();
    }, [])

    // handle form clicks
    const mainRef = useRef();
    const [isFormClicked, setFormClicked] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => {
            document.removeEventListener('mousedown', handleClick);
        }
    }, []);

    const handleClick = (e) => {
        if (mainRef.current.contains(e.target)) {
            return;
        }
        setFormClicked(false);
    };

    const onClick = (e) => {
        setFormClicked(true);
    };

    const onChange = (e) => {
        console.log(e.target.name, e.target.value);
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (e.nativeEvent.submitter.value === 'update') {
            auth.patchUserData(form);
        }
        if (e.nativeEvent.submitter.value === 'cancel') {
            resetProfileFormValue();
        }
    }

    const onClickLogout = useCallback((e) => {
        auth.logout().then(() => {
            history.replace({ pathname: '/login' });
        });
    }, [auth, history]);

    return (
        <div className={styles.main} ref={mainRef}>
            <nav className={styles.nav}>
                <NavLink
                    exact to={{ pathname: '/profile' }}
                    activeClassName={styles.activeLink}
                    className={`text text_type_main-large text-color-inactive ${styles.navChild}`}>
                    Профиль
                </NavLink>

                <NavLink
                    exact to={{ pathname: '/profile/orders' }}
                    activeClassName={styles.activeLink}
                    className={`text text_type_main-large text-color-inactive ${styles.navChild}`}>
                    История заказов
                </NavLink>

                <Link
                    onClick={onClickLogout}
                    to={{ pathname: '/404' }}
                    className={`text text_type_main-large text-color-inactive ${styles.navChild}`}>
                    Выход
                </Link>

                <p className={`text text_type_main-small text_color_inactive ${styles.navParagraph}`}>В этом разделе вы можете изменить свои персональные данные</p>
            </nav>

            <form onSubmit={onSubmit} onClick={onClick} className={styles.form}>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={form.username}
                    name={'username'}
                    icon={'EditIcon'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'}
                />

                <div className={styles.formChild}>
                    <Input
                        type={'text'}
                        placeholder={'Логин'}
                        onChange={onChange}
                        value={form.email}
                        name={'email'}
                        icon={'EditIcon'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>

                <div className={styles.formChild}>
                    <PasswordInput
                        onChange={onChange}
                        value={form.password}
                        name={'password'}
                    />
                </div>


                {isFormClicked && (
                    <div className={styles.formChild}>
                        <Button
                            type="secondary" size="medium" value="cancel" name="cancel"
                        >
                            Отмена
                        </Button>

                        <Button
                            type="primary" size="medium" value="update" name="update"
                        >
                            Сохранить
                        </Button>
                    </div>
                )}

            </form>
        </div>

    )
}