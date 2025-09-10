export function createProductCard(product) {
        const formatPrice = (value) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD' }).format(value);

        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3';

        const card = document.createElement('article');
        card.className = 'card h-100 shadow-sm product-card';
        card.tabIndex = 0;
        card.setAttribute('aria-labelledby', `prod-title-${product.id}`);

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.title;
        img.loading = 'lazy';
        img.className = 'card-img-top p-3 bg-white';

        // Body
        const body = document.createElement('div');
        body.className = 'card-body d-flex flex-column';

        const title = document.createElement('h2');
        title.id = `prod-title-${product.id}`;
        title.className = 'card-title h6';
        title.textContent = product.title;

        const price = document.createElement('p');
        price.className = 'card-text fw-semibold text-primary mt-auto';
        price.textContent = formatPrice(product.price);

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn btn-outline-primary w-100 mt-2';
        btn.textContent = 'Ver detalles';
        btn.setAttribute('data-product-id', String(product.id));

        // TODO: Abrir modal con detalles al hacer clic
        btn.addEventListener('click', () => {
          // Próximo punto: abrir modal con detalles.
          // Por ahora mostramos un aviso no bloqueante para validar flujo.
          const toast = document.createElement('div');
          toast.className = 'position-fixed top-0 start-50 translate-middle-x mt-3 alert alert-secondary shadow';
          toast.role = 'status';
          toast.textContent = 'En el siguiente paso abriremos un modal con detalles.';
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 1800);
        });

        body.append(title, price, btn);
        card.append(img, body);
        col.append(card);
        return col;
      }