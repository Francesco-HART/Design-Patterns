// Observer Pattern Example: Newsletter Subscription

// Observer interface
export interface Subscriber {
	update(news: string): void;
}

// Subject interface
export interface Publisher {
	subscribe(subscriber: Subscriber): void;
	unsubscribe(subscriber: Subscriber): void;
	notify(news: string): void;
}

// Concrete Subject
class Newsletter implements Publisher {
	private subscribers: Subscriber[] = [];

	subscribe(subscriber: Subscriber): void {
		if (!this.subscribers.includes(subscriber)) {
			this.subscribers.push(subscriber);
		}
	}

	unsubscribe(subscriber: Subscriber): void {
		const index = this.subscribers.indexOf(subscriber);
		if (index > -1) {
			this.subscribers.splice(index, 1);
		}
	}

	notify(news: string): void {
		for (const subscriber of this.subscribers) {
			subscriber.update(news);
		}
	}

	publishNews(news: string): void {
		console.log(`Newsletter: Publishing "${news}"`);
		this.notify(news);
	}
}

// Concrete Observers
class EmailSubscriber implements Subscriber {
	constructor(private email: string) {}

	update(news: string): void {
		console.log(`Email sent to ${this.email}: ${news}`);
	}
}

class SMSSubscriber implements Subscriber {
	constructor(private phone: string) {}

	update(news: string): void {
		console.log(`SMS sent to ${this.phone}: ${news}`);
	}
}

class PushNotificationSubscriber implements Subscriber {
	constructor(private deviceId: string) {}

	update(news: string): void {
		console.log(`Push notification to ${this.deviceId}: ${news}`);
	}
}

// Example usage:
const newsletter = new Newsletter();

const emailSub = new EmailSubscriber("user@example.com");
const smsSub = new SMSSubscriber("+33612345678");
const pushSub = new PushNotificationSubscriber("device-123");

newsletter.subscribe(emailSub);
newsletter.subscribe(smsSub);
newsletter.subscribe(pushSub);

newsletter.publishNews("New article published!");
// Output:
// Newsletter: Publishing "New article published!"
// Email sent to user@example.com: New article published!
// SMS sent to +33612345678: New article published!
// Push notification to device-123: New article published!

newsletter.unsubscribe(smsSub);

newsletter.publishNews("Breaking news!");
// Output:
// Newsletter: Publishing "Breaking news!"
// Email sent to user@example.com: Breaking news!
// Push notification to device-123: Breaking news!
