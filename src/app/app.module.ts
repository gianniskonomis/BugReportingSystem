import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BacklogComponent } from './components/backlog/backlog.component';
import { BacklogService } from './services/backlog.service';
import { BugComponent } from './components/bug/bug.component';
import { HttpClientModule } from '@angular/common/http';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { RouterModule } from '@angular/router';
import { routes } from './routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    BacklogComponent,
    BugComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BacklogService, HttpClientModule ],
  bootstrap: [AppComponent],
  exports: [BugComponent]
})
export class AppModule { }
