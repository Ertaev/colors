export const createProductCard = (el, item) => {
	if (el === "catalog") {
		return `
			<article class="catalog__item" itemscope itemtype="https://schema.org/Product">
				<a href="/" class="catalog__item-link catalog__item-top" itemprop="url">
					<div class="catalog__item-image">
						<img src="${item.image}" alt="${item.title}" itemprop="image">
					</div>

					<h4 class="catalog__item-title" itemprop="name">
						${item.title}
					</h4>
				</a>

				<div class="catalog__item-body" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
					<div class="catalog__item-bottom">
						<p class="catalog__item-price">
							<span itemprop="price" content="${item.price}"><b>${item.price}</b> ₽</span>
							<meta itemprop="priceCurrency" content="RUB">
							<link itemprop="availability" href="https://schema.org/InStock">
						</p>

						<div class="catalog__item-actions">
							<button class="catalog__item-button" aria-label="Добавить в корзину" data-id="${item.id}">
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M10 4.16663V15.8333" stroke="#1F2020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
									<path d="M4.16699 10H15.8337" stroke="#1F2020" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
								</svg>
							</button>

							<button class="catalog__item-fav" aria-label="Добавить в избранное">
								<svg width="18" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M10.0009 17C9.74503 17.0001 9.49782 16.9074 9.30525 16.739C8.57966 16.1047 7.87674 15.5067 7.25817 14.9802C5.65691 13.7048 4.16127 12.3023 2.78581 10.7865C1.67695 9.59183 1.0423 8.03408 1.00085 6.4053C0.976207 4.99164 1.48598 3.62067 2.42845 2.56595C2.88583 2.0681 3.44256 1.67154 4.06275 1.40184C4.68294 1.13214 5.35283 0.995297 6.0292 1.00012C7.05552 0.995406 8.053 1.3392 8.8581 1.97514C9.29424 2.31625 9.6791 2.71815 10.0009 3.16854C10.3231 2.71841 10.7082 2.31682 11.1446 1.97605C11.9489 1.34036 12.9453 0.99628 13.9708 1.00012C14.6472 0.995297 15.3171 1.13214 15.9372 1.40184C16.5574 1.67154 17.1142 2.0681 17.5715 2.56595C18.514 3.62067 19.0238 4.99164 18.9991 6.4053C18.9585 8.03374 18.3249 9.59147 17.2169 10.7865C15.8425 12.3013 14.3481 13.7028 12.7482 14.9775C12.1287 15.5049 11.4267 16.1029 10.6975 16.7399C10.5045 16.9081 10.257 17.0005 10.0009 17V17Z" fill="white" stroke="black" stroke-width="1.2"/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</article>
		`;
	} else {
		return `
			<li class="cart__item" data-id="${item.id}">
				<a href="/" class="cart__item-link">
					<div class="cart__item-img">
						<img src="${item.image}" alt="${item.title}">
					</div>

					<div class="cart__item-info">
						<h4 class="cart__item-title">${item.title}</h4>

						<p class="cart__item-price"><b>${item.price}</b> ₽</p>
					</div>
				</a>

				<div class="counter">
					<button class="counter__button cart__icon--minus">
						<svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1.3335 1H10.6668" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>

					<label>
						<input class="counter__input" type="text" data-min="1" data-max="99" name="count" value="${item.quantity}" readonly="">
					</label>

					<button class="counter__button cart__icon--plus">
						<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M8 3.33325V12.6666" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M3.3335 8H12.6668" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
						</svg>
					</button>
				</div>

				<button class="cart__item-remove">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g opacity="0.2">
							<path d="M18 6L6 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
							<path d="M6 6L18 18" stroke="#1F2020" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
						</g>
					</svg>
				</button>

				<button class="cart__item-change">
					<svg width="24" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M15 1L19 5L15 9" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M1 11V9C1 7.93913 1.42143 6.92172 2.17157 6.17157C2.92172 5.42143 3.93913 5 5 5H19" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M5 23L1 19L5 15" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M19 13V15C19 16.0609 18.5786 17.0783 17.8284 17.8284C17.0783 18.5786 16.0609 19 15 19H1" stroke="black" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</button>
			</li>
		`
	}
};