import { Component, Injector } from '@angular/core';
import { AbstractKubernetesEntryRendererComponent } from '../../../namespaces/operation/abstract-kubernetes-entry-renderer.component';

@Component({
  selector: 'app-services-entry-renderer',
  templateUrl: './service-broker-entry-renderer.component.html'
})
export class ServiceBrokerEntryRendererComponent extends AbstractKubernetesEntryRendererComponent {
  constructor(protected injector: Injector) {
    super(injector);
  }

  getStatus(entry) {
    return (entry.status && entry.status.ready) 
      ? 'RUNNING' 
      : (entry.status && entry.status.reason) 
        ? entry.status.reason.toUpperCase()
        : 'ERROR';
  }
}
