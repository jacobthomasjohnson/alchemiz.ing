function HeaderLink({text, href}) {
    return (
        <div className="hover:cursor-pointer hover:underline p-2 -m-2">
            <a onClick={openModal({href})}>{text}</a>
        </div>
    )
}

export default HeaderLink;