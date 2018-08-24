import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService, User } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';
import { Auth } from 'firebase/auth';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  user: Observable<User | null>;
  task: AngularFireUploadTask;
  uploadPercentage: Observable<Number>;
  snapshot: Observable<any>;
  downloadUrl: Observable<string>;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private auth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  uploadFile(event) {
    console.log(this.auth.user.subscribe(user =>
    user.uid));
    const file = event.target.files[0];
    const filePath = `users/${this.auth.auth.currentUser.uid}/profile_pic/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, file);
    this.updatePhotoProfile(filePath);
    this.uploadPercentage = this.task.percentageChanges();
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = fileRef.getDownloadURL())
    )
    .subscribe();
  }

  updatePhotoProfile(filePath) {
    this.auth.auth.currentUser.updateProfile({ displayName: null, photoURL: filePath}).catch(error => console.log(error));
  }

}
