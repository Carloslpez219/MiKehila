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
    canActivate: [GuardGuard],
    path: 'photoalbum',
    loadChildren: () => import('./pages/photoalbum/photoalbum.module').then( m => m.PhotoalbumPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'detalle-photoalbum',
    loadChildren: () => import('./pages/detalle-photoalbum/detalle-photoalbum.module').then( m => m.DetallePhotoalbumPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'detalle-pinboard',
    loadChildren: () => import('./pages/detalle-pinboard/detalle-pinboard.module').then( m => m.DetallePinboardPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'familaires',
    loadChildren: () => import('./pages/familaires/familaires.module').then( m => m.FamilairesPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'detalle-familiar',
    loadChildren: () => import('./pages/detalle-familiar/detalle-familiar.module').then( m => m.DetalleFamiliarPageModule)
  },
  {
    canActivate: [GuardGuard],
    path: 'crear-familiar',
    loadChildren: () => import('./pages/crear-familiar/crear-familiar.module').then( m => m.CrearFamiliarPageModule)
  },  {
    path: 'image-modal',
    loadChildren: () => import('./pages/image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
