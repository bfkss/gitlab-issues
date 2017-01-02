'use babel';

import GitlabIssuesView from './gitlab-issues-view';
import { CompositeDisposable } from 'atom';

export default {

  gitlabIssuesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.gitlabIssuesView = new GitlabIssuesView(state.gitlabIssuesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.gitlabIssuesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'gitlab-issues:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.gitlabIssuesView.destroy();
  },

  serialize() {
    return {
      gitlabIssuesViewState: this.gitlabIssuesView.serialize()
    };
  },

  toggle() {
    console.log('GitlabIssues was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
