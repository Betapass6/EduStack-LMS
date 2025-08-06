import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Discussion } from 'src/app/core/services/discussion.service';

@Component({
  selector: 'app-discussion-item',
  templateUrl: './discussion-item.component.html',
  // styleUrls: ['./discussion-item.component.scss']
})
export class DiscussionItemComponent {
  @Input() discussion!: Discussion;
  @Input() replyInput!: { [id: string]: string };
  @Output() sendReply = new EventEmitter<Discussion>();

  showReplyForm = false;

  toggleReply() {
    this.showReplyForm = !this.showReplyForm;
  }

  submitReply() {
    this.sendReply.emit(this.discussion);
    this.showReplyForm = false;
  }
} 