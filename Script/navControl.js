const editNav = (windowY, topNav) => {
	return windowY ? () => {
		topNav.classList.add("active");
	} : () => {
		topNav.classList.remove("active");
	}
}