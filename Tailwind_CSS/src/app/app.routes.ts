import { Routes } from '@angular/router';
import { ColorWidthHeightComponent } from './color-width-height/color-width-height.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TypographyComponent } from './typography/typography.component';
import { PaddingMarginComponent } from './padding-margin/padding-margin.component';
import { BorderRadiusComponent } from './border-radius/border-radius.component';
import { GradiantColorAndHoverEffectComponent } from './gradiant-color-and-hover-effect/gradiant-color-and-hover-effect.component';
import { FelxBoxComponent } from './felx-box/felx-box.component';
import { GridComponent } from './grid/grid.component';
import { ResponsiveComponent } from './responsive/responsive.component';
import { AnimationAndTransitionComponent } from './animation-and-transition/animation-and-transition.component';
import { Project1Component } from './project-1/project-1.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { Project3Component } from './project3/project3.component';


export const routes: Routes = [
    {path:'color_width_heigth',component:ColorWidthHeightComponent},
    {path:'typography',component:TypographyComponent},
    {path:'padding_margin',component:PaddingMarginComponent},
    {path:'border_radius',component:BorderRadiusComponent},
    {path:'gradiant_color_and_hover_effect',component:GradiantColorAndHoverEffectComponent},
    {path:'flexbox',component:FelxBoxComponent},
    {path:'grid',component:GridComponent},
    {path:'responsive',component:ResponsiveComponent},
    {path:'animation_transition',component:AnimationAndTransitionComponent},
    {path:'project1',component:Project1Component},
    {path:'project2',component:ProjectFormComponent},
    {path:'project3',component:Project3Component},
    {path:'dashboard',component:DashboardComponent},
    {path:'',redirectTo:'dashboard',pathMatch:'full'},
];
