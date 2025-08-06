import { Component, Input, OnInit } from '@angular/core';
import { DiscussionService, Discussion } from 'src/app/core/services/discussion.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-discussion-list',
  templateUrl: './discussion-list.component.html',
  // styleUrls: ['./discussion-list.component.scss']
})
export class DiscussionListComponent implements OnInit {
  @Input() courseId!: string;
  discussions: Discussion[] = [];
  loading = true;
  error = '';
  replyInput: { [id: string]: string } = {};
  user: any;
  newMessage = '';

  constructor(private discussionService: DiscussionService, private auth: AuthService) {
    this.user = this.auth.getUser();
  }

  ngOnInit(): void {
    this.loadDiscussions();
  }

  loadDiscussions() {
    this.loading = true;
    this.discussionService.getByCourse(this.courseId).subscribe({
      next: (data) => {
        this.discussions = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Gagal memuat diskusi';
        this.loading = false;
      }
    });
  }

  sendReply(parent: Discussion) {
    const msg = this.replyInput[parent.id];
    if (!msg) return;
    this.discussionService.reply(parent.id, msg).subscribe({
      next: () => {
        this.replyInput[parent.id] = '';
        this.loadDiscussions();
      },
      error: () => {
        alert('Gagal mengirim reply');
      }
    });
  }

  createDiscussion() {
    if (!this.newMessage) return;
    this.discussionService.create({
      course: this.courseId,
      message: this.newMessage
    }).subscribe({
      next: () => {
        this.newMessage = '';
        this.loadDiscussions();
      },
      error: () => {
        alert('Gagal membuat diskusi');
      }
    });
  }
} 