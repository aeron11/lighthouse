/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * @fileoverview Audits a page to see if it is requesting usage of the notification API on
 * page load. This is often a sign of poor user experience because it lacks context.
 */

'use strict';

const ViolationAudit = require('../violation-audit');

class NotificationOnStart extends ViolationAudit {
  /**
   * @return {!AuditMeta}
   */
  static get meta() {
    return {
      name: 'notification-on-start',
      description: 'Avoids requesting the notification permission on page load',
      failureDescription: 'Requests the notification permission on page load',
      helpText: 'Users are mistrustful of or confused by sites that request to send ' +
          'notifications without context. Consider tying the request to user gestures ' +
          'instead. [Learn more](https://developers.google.com/web/tools/lighthouse/audits/notifications-on-load).',
      requiredArtifacts: ['ChromeConsoleMessages'],
    };
  }

  /**
   * @param {!Artifacts} artifacts
   * @return {!AuditResult}
   */
  static audit(artifacts) {
    const results = ViolationAudit.getViolationResults(artifacts, /notification permission/);

    const headings = [
      {key: 'url', itemType: 'url', text: 'URL'},
      {key: 'label', itemType: 'text', text: 'Location'},
    ];
    const details = ViolationAudit.makeTableDetails(headings, results);

    return {
      rawValue: results.length === 0,
      extendedInfo: {
        value: results,
      },
      details,
    };
  }
}

module.exports = NotificationOnStart;
