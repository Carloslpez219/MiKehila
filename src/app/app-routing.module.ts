import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardGuard } from './guards/guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Notificaciones',
    pathMatch: 'full'
  },
  {
    canActivate: [GuardGuard],
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'actividades',
    loadChildren: () => import('./pages/actividades/actividades.module').then( m => m.ActividadesPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'actividad',
    loadChildren: () => import('./pages/actividad/actividad.module').then( m => m.ActividadPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'encuestas',
    loadChildren: () => import('./pages/encuestas/encuestas.module').then( m => m.EncuestasPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'multimedia',
    loadChildren: () => import('./pages/multimedia/multimedia.module').then( m => m.MultimediaPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'detalle-multimedia',
    loadChildren: () => import('./pages/detalle-multimedia/detalle-multimedia.module').then( m => m.DetalleMultimediaPageModule)
  },
  {
    path: 'photoalbum',
    loadChildren: () => import('./pages/photoalbum/photoalbum.module').then( m => m.PhotoalbumPageModule)
  },
  {
    path: 'detalle-photoalbum',
    loadChildren: () => import('./pages/detalle-photoalbum/detalle-photoalbum.module').then( m => m.DetallePhotoalbumPageModule)
  },
  {
    path: 'detalle-pinboard',
    loadChildren: () => import('./pages/detalle-pinboard/detalle-pinboard.module').then( m => m.DetallePinboardPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
