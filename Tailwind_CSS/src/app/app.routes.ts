import { Routes } from '@angular/router';
import { ColorWidthHeightComponent } from './color-width-height/color-width-height.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TypographyComponent } from './typography/typography.component';
import { PaddingMarginComponent } from './padding-margin/padding-margin.component';
import { BorderRadiusComponent } from './border-radius/border-radius.component';
import { GradiantColorAndHoverEffectComponent } from './gradiant-color-and-hover-effect/gradiant-color-and-hover-effect.component';
import { FelxBoxComponent } from './felx-box/felx-box.component';
import { GridComponent } from './grid/grid.component';


export const routes: Routes = [
    {path:'color_width_heigth',component:ColorWidthHeightComponent},
    {path:'typography',component:TypographyComponent},
    {path:'padding_margin',component:PaddingMarginComponent},
    {path:'border_radius',component:BorderRadiusComponent},
    {path:'gradiant_color_and_hover_effect',component:GradiantColorAndHoverEffectComponent},
    {path:'flexbox',component:FelxBoxComponent},
    {path:'grid',component:GridComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
];
