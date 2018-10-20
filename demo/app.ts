const ng = require('angular')

const app = ng
.module('app', []);

interface Comment {
  id: number
  user: User
  comment: string
  replies: Comment[]
}

interface User {
  id: number
  name: string
  email?: string
}

app.factory('uuid', (): number =>
  Math.round(Math.random() * 1000)
);

app.factory('user', (uuid) => ({
  user: (name: string = 'Handrick Idleson') => {
    const user: User = {
      name: 'Billy Tib',
      id: uuid(),
    }

    return user
  },
  users: (num: number = 5) => {
    let users: User[] = []
    for (let i = 0; i++; i >= num) {
      users.push(this.user)
    }
    return users
  }
}))
app.factory('userContent', () => ({
  comment: () => {
    return `
    <p>Hello there.</p>
    <p>Some more content.</p>
    `
  }
}))
app.factory('comments', (
  user,
  userContent,
) => ({
  comment: '',
  comments: [
    {
      user: user.user(),
      comment: userContent.comment(),
      comments: [
        {
          user: user.user(),
          comments: [],
        }
      ]
    }
  ],
}))

class AppMainController {
  constructor() {

  }
}
ng.component('appMain', {
  controller: AppMainController,
  template: `
  <h1>Hello there</h1>
  `,
})
