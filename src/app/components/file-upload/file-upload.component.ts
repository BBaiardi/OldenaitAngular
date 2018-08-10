import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService, User } from '../../core/services/auth.service';
import { Observable } from 'rxjs';
import { tap, finalize, map } from 'rxjs/operators';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  user: Observable<User | null>;
  task: AngularFireUploadTask;
  percentage: Observable<Number>;
  snapshot: Observable<any>;
  downloadUrl: Observable<string>;

  constructor(private storage: AngularFireStorage, private db: AngularFirestore, private auth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `users/${this.auth.auth.currentUser.uid}/profile_pic/${file.name}`;
    this.auth.auth.currentUser.updateProfile({ displayName: 'caca', photoURL: filePath});
    const fileRef = this.storage.ref(filePath);
    this.task = this.storage.upload(filePath, file);
    this.percentage = this.task.percentageChanges();
    const uploadProgress = this.task.snapshotChanges()
    .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
    this.task.snapshotChanges().pipe(
      finalize(() => this.downloadUrl = fileRef.getDownloadURL())
    )
    .subscribe();
  }

  startUpload(event: FileList) {
    const file = event.item(0);
    if (file.type.split('/')[0] !== 'image') {
      console.error('Archivo no soportado');
      return;
    }
    const path = `test\${new Date().getTime()}_$(file.name)`;
    const fileRef = this.storage.ref(path);
    this.task = this.storage.upload(path, file);
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    this.downloadUrl = fileRef.getDownloadURL();
  }

}
