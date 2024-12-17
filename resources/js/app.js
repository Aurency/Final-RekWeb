import React from 'react';
import { createRoot } from 'react-dom/client';
import { App as InertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';

InertiaProgress.init();

const app = document.getElementById('app');

createRoot(app).render(
    <InertiaApp initialPage={JSON.parse(app.dataset.page)} />
);
